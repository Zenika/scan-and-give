const API = 'https://europe-west1-scan-and-give.cloudfunctions.net/live/event'

const DONATIONS_BEFORE_RELOAD = 10

class Cache {
  constructor(onEventChanged, { user_id, event_id }) {
    this.API_URL = `${API}/${user_id}/${event_id}`
    this.onEventChanged = onEventChanged
    this.user_id = user_id
    this.event_id = event_id

    const local = this.getLocalStorage()
    if (local) {
      this.event = local.event
      this.retryStack = local.retryStack
      this.countdown = local.countdown
      onEventChanged(local.event)
    } else {
      this.event = null
      this.retryStack = []
      this.countdown = DONATIONS_BEFORE_RELOAD
    }
  }

  getLocalStorage() {
    const local = localStorage.getItem(`${this.user_id}/${this.event_id}`)
    return local ? JSON.parse(local) : null
  }

  setLocalStorage() {
    console.log('Updating localStorage', this.retryStack)
    localStorage.setItem(
      `${this.user_id}/${this.event_id}`,
      JSON.stringify({ event: this.event, retryStack: this.retryStack, countdown: this.countdown })
    )
  }

  fetchEvent() {
    fetch(this.API_URL)
      .then(r => r.json())
      .then(({ event }) => {
        // Reset countdown on success
        this.countdown = DONATIONS_BEFORE_RELOAD
        this.updateLocalEvent(event)
      })

    if (this.retryStack.length > 0) {
      this.sendDonations(this.retryStack)
    }
  }

  updateLocalEvent(event) {
    this.event = event
    this.onEventChanged(event)
    this.setLocalStorage()
  }

  makeDonation(donation, onSuccess, onError) {
    // Verify the hash hasn't been used already
    if (
      this.event.donations.find(d => d.hash === donation.hash) ||
      this.retryStack.find(d => d.hash === donation.hash)
    ) {
      onError()
      return
    }
    onSuccess()

    // Try sending the donation with the retryStack
    this.sendDonations([...this.retryStack, donation]).catch(() => {
      // There was an error, we add the donation to the stack
      this.retryStack.push(donation)

      // Optimistically add the donation to the event
      this.updateLocalEvent({
        ...this.event,
        donations: [...this.event.donations, donation]
      })
    })
  }

  sendDonations(donations) {
    console.log('Sending', donations)
    return fetch(`${this.API_URL}/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        donations
      })
    })
      .then(r => r.json())
      .then(({ donations }) => {
        console.log('Receiving', donations)
        // We received a response, we can remove some of the stack
        this.retryStack = this.retryStack.filter(
          donation => !donations.find(d => d.hash === donation.hash)
        )

        // Update local event with the new donations
        this.updateLocalEvent({
          ...this.event,
          donations: [
            // All previous donations that weren't part of this request
            ...this.event.donations.filter(
              donation => !donations.find(d => d.hash === donation.hash)
            ),
            // All donations part of this request that are successful
            ...donations.filter(d => d.success)
          ]
        })

        this.decrementCountdown(donations.length)
      })
  }

  decrementCountdown(count) {
    this.countdown -= count
    if (this.countdown <= 0) {
      this.fetchEvent()
    }
    this.setLocalStorage()
  }
}

export default Cache

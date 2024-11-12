        // Initial course price and time setup
        let coursePrice = 50;
        const priceElement = document.getElementById("price");
        const priceUpdateElement = document.getElementById("price-update");
        const timerElement = document.getElementById("timer");
    
        // Display initial price
        priceElement.textContent = `$${coursePrice}`;
    
        // Set initial time limits
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
        const sevenDaysInMilliseconds = 7 * oneDayInMilliseconds;
        const offerEndTime = new Date().getTime() + sevenDaysInMilliseconds;
        let nextPriceIncreaseTime = new Date().getTime() + oneDayInMilliseconds;
    
        // Update timer and price every second
        function updateOffer() {
          const now = new Date().getTime();
          const timeLeft = offerEndTime - now;
    
          // Check if a day has passed and increase price
          if (now >= nextPriceIncreaseTime && timeLeft > 0) {
            coursePrice += 20;
            priceElement.textContent = `$${coursePrice}`;
            priceUpdateElement.textContent = "Price increased. Next increase in 24 hours.";
            nextPriceIncreaseTime += oneDayInMilliseconds; // Set time for next increase
          }
    
          // Calculate days, hours, minutes, and seconds remaining
          if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
            // Display remaining time in the timer
            timerElement.textContent =
              `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          } else {
            // Offer expired
            timerElement.textContent = "Offer expired.";
            priceUpdateElement.textContent = "Offer no longer available.";
            clearInterval(intervalId); // Stop updating
          }
        }
    
        // Run the update function every second
        const intervalId = setInterval(updateOffer, 1000);
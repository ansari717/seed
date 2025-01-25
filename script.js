let counter = 0;



document.getElementById('start-scan').addEventListener('click', async () => {

    const startButton = document.getElementById('start-scan');

    const seedElement = document.getElementById('seed');

    const counterElement = document.getElementById('counter');

    const addressElement = document.getElementById('address');

    const balanceElement = document.getElementById('balance');

    const transactionElement = document.getElementById('transaction');



    startButton.disabled = true;

    startButton.textContent = 'Scanning...';



    const scanWallet = async () => {

        // Simulate API call

        const response = await fetch('/api/generate-wallet');

        const data = await response.json();



        // Update the UI

        seedElement.textContent = data.seedPhrase;

        addressElement.textContent = data.address;

        balanceElement.textContent = `${data.balance} ETH`;

        transactionElement.textContent = data.lastTransaction

            ? JSON.stringify(data.lastTransaction)

            : 'No transactions found.';



        // Update counter

        counter++;

        counterElement.textContent = counter;



        // If balance is found, stop scanning

        if (parseFloat(data.balance) > 0) {

            startButton.textContent = 'Scanning Stopped (Positive Balance Found)';

            startButton.disabled = false;

            return;

        }



        // Continue scanning

        setTimeout(scanWallet, 2000); // Adjust delay as needed

    };



    scanWallet();

});
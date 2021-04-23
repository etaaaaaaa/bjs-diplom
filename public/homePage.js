const doLogout = new LogoutButton();

doLogout.action = function () {
    ApiConnector.logout( response => {
        if (response.success) location.reload();
    })
}

// -----------

ApiConnector.current( answer => {
    if (answer.success) ProfileWidget.showProfile(answer.data);
})

// -----------

const ratesBoard = new RatesBoard();

function getCurrency () {
    ApiConnector.getStocks( answer => {
        if (answer.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(answer.data);
        }
    })
}

getCurrency();
setInterval(getCurrency, 60000);

// ------------

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, answer => {
        if (answer.success) {
            ProfileWidget.showProfile(answer.data);
            moneyManager.setMessage(answer.success ,'Success! Money added');
        } else {
            // moneyManager.setMessage(!answer.success, answer.data);
            moneyManager.setMessage(false, answer.error);
        }
    })
}

moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, answer => {
        if (answer.success) {
            ProfileWidget.showProfile(answer.data);
            moneyManager.setMessage(answer.success ,'Success! Conversion happened');
        } else {
            moneyManager.setMessage(false, answer.error);
        }
    })
}

moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, answer => {
        if (answer.success) {
            ProfileWidget.showProfile(answer.data);
            moneyManager.setMessage(answer.success ,'Success! Money sent');
        } else {
            moneyManager.setMessage(false, answer.error);
        }
    })
}

// -------------

const favorites = new FavoritesWidget();

ApiConnector.getFavorites( answer => {
    if (answer.success) {
        favorites.clearTable();
        favorites.fillTable(answer.data);
        // moneyManager.updateUsersList(answer.data);
    }
})

favorites.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, answer => {
        if (answer.success) {
            favorites.clearTable();
            favorites.fillTable(answer.data);
            moneyManager.updateUsersList(answer.data); //NEW
            favorites.setMessage(answer.success, 'Success! User added');
        } else {
            favorites.setMessage(false, answer.error);
        }
    })
}

favorites.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, answer => {
        if (answer.success) {
            favorites.clearTable();
            favorites.fillTable(answer.data);
            moneyManager.updateUsersList(answer.data); //NEW
            favorites.setMessage(answer.success, 'Success! User removed');
        } else {
            favorites.setMessage(false, answer.error); // NEW
        }
    })
}
const userform = new UserForm();

userform.loginFormCallback = function (data) {
    ApiConnector.login( data, answer => {
        if (answer.success) location.reload();
        else {
            userform.setLoginErrorMessage(`Пользователь c указанными логином и паролем не найден`); //NEW
        }
    })
}

userform.registerFormCallback = function (data) {
    ApiConnector.register( data, answer => {
        if (answer.success) location.reload()
        else {
            userform.setLoginErrorMessage(`Что-то пошло не так`); //NEW
        }
    })
}

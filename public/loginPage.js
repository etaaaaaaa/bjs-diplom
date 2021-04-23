const userform = new UserForm();

userform.loginFormCallback = function (data) {
    ApiConnector.login( data, answer => {
        console.log(answer);
        if (answer.success) location.reload();
        else {
            userform.setLoginErrorMessage(`Пользователь c указанными логином и паролем не найден`); //NEW
            console.error(answer.data);
        }
    })
}

userform.registerFormCallback = function (data) {
    ApiConnector.register( data, answer => {
        console.log(answer);
        if (answer.success) location.reload()
        else {
            userform.setLoginErrorMessage(`Что-то пошло не так`); //NEW
            console.error(answer.data);
        }
    })
}
const userform = new UserForm();

userform.loginFormCallback = function (data) {
    ApiConnector.login( data, answer => {
        console.log(answer);
        if (answer.success) location.reload()
        else console.error(answer.data);
    })
}

userform.registerFormCallback = function (data) {
    ApiConnector.register( data, answer => {
        console.log(answer);
        if (answer.success) location.reload()
        else console.error(answer.data);
    })
}
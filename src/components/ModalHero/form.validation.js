const verifyIfAllFieldsAreValid = (formData) => {
    let allFieldsAreValid = true;
    let message_error = "";
    for (let prop in formData) {
        if (formData[prop] === "") {
            allFieldsAreValid = false;
        } else {
            let value = formData[prop];
            if (prop === "name") {
                if (value.length > 25) {
                    allFieldsAreValid = false;
                    message_error = "O nome não pode possui mais de 25 caracteres.";
                }
            } else if (prop === "latitude" || prop === "longitude") {
                if (Number(value) > 180 || Number(value) < -180) {
                    allFieldsAreValid = false;
                    message_error =
                        "Latitude e Longitude não podem ser maior que 180 ou menor que -180.";
                }
            }
        }
    }
    return { allFieldsAreValid, message_error };
};

export { verifyIfAllFieldsAreValid };

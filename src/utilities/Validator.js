var Validator = {}
Validator.validateId = (empId) => {
    var regex = new RegExp(/^[0-9]{3}$/)
    if( !regex.test(empId)) throw new Error('EmpId is Invalid')
}

module.exports = Validator;
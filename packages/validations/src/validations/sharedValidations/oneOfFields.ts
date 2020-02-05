// const Yup = require('yup')

// Yup.addMethod(Yup.object, 'atLeastOneOf', function(list) {
//   return this.test({
//     name: 'atLeastOneOf',
//     message: '${path} must have at least one of these keys: ${keys}',
//     exclusive: true,
//     params: { keys: list.join(', ') },
//     test: value => value == null || list.some(f => value[f] != null)
//   })
// })

// const Schema = Yup.object()
//   .shape({
//     one: Yup.number(),
//     two: Yup.number(),
//     three: Yup.number()
//   })
//   .atLeastOneOf(['one', 'two'])

// Schema.isValidSync({ three: 3 }) // false
// Schema.isValidSync({ one: 1, three: 3 }) // true

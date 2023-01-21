const formidable = require('formidable')

const form = formidable({ multiples: false });

const formDataParser = async (req) => {
  try {
    const parse = new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err)
        }

        resolve({
          fields,
          files
        })
      })
    })

    return await parse
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = formDataParser

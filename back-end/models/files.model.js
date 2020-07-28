module.exports = mongoose => {

    
    const fs = require("fs");
    const path = require("path");
    const { promisify } = require("util");

    var schemaFiles = mongoose.Schema ({
        original: String,
        foto: String,              
        size: Number ,
        url: String       
    },
        { timestamps: true }
    )

    schemaFiles.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    schemaFiles.pre("save", function() {
        if (this.foto.split('.').pop() === 'pdf') {
          this.url = "http://localhost:8080/files/pdf.png"
        }
        if ((this.foto.split('.').pop() === 'docx') || (this.foto.split('.').pop() === 'doc')  ) {
            this.url = "http://localhost:8080/files/doc.png"
        }
        if ((this.foto.split('.').pop() !== 'pdf') && (this.foto.split('.').pop() !== 'doc') && (this.foto.split('.').pop() !== 'docx') ) {
            this.url = `http://localhost:8080/files/${this.foto}`
          }
      })

    schemaFiles.pre("remove", function() {
        return promisify(fs.unlink)(
            path.resolve(__dirname, '..', '..', 'front-end', 'src', 'images', this.foto)
        )
    })
    

    const Files = mongoose.model("files", schemaFiles)
    return Files
}
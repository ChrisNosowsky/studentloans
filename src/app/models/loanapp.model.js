module.exports = mongoose => {
    const schema =
      mongoose.Schema(
        {
          Userid: Number,
          FirstName: String,
          LastName: String,
          LoanAmount: String,
          Rate: String,
          DateIssued: String,
          Issued: String
        },
        { timestamps: true }
      );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const openApps = mongoose.model("openApps", schema);
      return openApps;
  };
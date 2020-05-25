const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Nu var det något som blev fel😖");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) =>
            res.status(400).json("Den användaren kan vi inte hitta tyvärr")
          );
      } else {
        res.status(400).json("Det verkar som du angett fel användaruppgifter");
      }
    })
    .catch((err) =>
      res.status(400).json("Det verkar som du angett fel användaruppgifter")
    );
};

module.exports = {
  handleSignin: handleSignin,
};

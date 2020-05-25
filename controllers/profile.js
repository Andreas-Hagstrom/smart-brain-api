const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({
      id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Ingen sådan användare");
      }
    })
    .catch((err) => res.status(400).json("Det går inte att hämta användaren"));
};

module.exports = {
  handleProfile: handleProfile,
};

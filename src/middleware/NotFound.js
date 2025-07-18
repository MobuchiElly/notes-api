const notFound = (req, res) => {
    res.status(404).json("The requested endpoint does not exist");
}

module.exports = notFound;
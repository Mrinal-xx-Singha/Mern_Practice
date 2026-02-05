export const health = (req, res) => {
  try {
    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

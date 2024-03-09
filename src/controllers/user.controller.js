const registerUser = async (req, res) => {
  try {
    res.status(200).json({
      messeage: "ok done, bangaye backend engineer",
    });
  } catch (error) {
    res.status(500).json({
      message: "some error occurred",
    });
  }
};
export { registerUser };

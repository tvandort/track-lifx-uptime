module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/build/"],
  watchPathIgnorePatterns: ["/build/"],
  transformIgnorePatterns: ["/build/"],
  coveragePathIgnorePatterns: ["/build/"]
};

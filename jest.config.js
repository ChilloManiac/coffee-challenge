/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	testEnvironment: "node",
	modulePathIgnorePatterns: ["dist/"],
	transform: {
		"^.+.tsx?$": ["ts-jest", {}],
	},
};

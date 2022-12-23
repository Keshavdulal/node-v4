import * as user from "../users";

describe("User Handler", () => {
  it("should create a new user", async () => {
    //
    const req = {
      body: {
        username: "hendrixer3",
        password: "youknowwhatiamsayin",
      },
    };

    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };

    // const newUser =
    await user.createNewUser(req, res, () => {});
  });
});

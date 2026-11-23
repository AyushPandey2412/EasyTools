export class TestService {
  getTestData() {
    return {
      success: true,
      feature: "test",
      message: "Test service executed successfully",
      timestamp: new Date().toISOString(),
    };
  }
}

export const testService = new TestService();

export interface TestRecord {
  id: string;
  name: string;
  createdAt: string;
}

export class TestService {
  private static mockData: TestRecord[] = [
    { id: "1", name: "Sample Item 1", createdAt: new Date().toISOString() },
    { id: "2", name: "Sample Item 2", createdAt: new Date().toISOString() },
  ];

  static async list(_options?: Record<string, unknown>): Promise<TestRecord[]> {
    return this.mockData;
  }

  static async getById(id: string): Promise<TestRecord | null> {
    const item = this.mockData.find((record) => record.id === id);
    return item ?? null;
  }

  static async create(payload: { name: string }): Promise<TestRecord> {
    const newRecord: TestRecord = {
      id: String(this.mockData.length + 1),
      name: payload.name || "Default Item",
      createdAt: new Date().toISOString(),
    };
    this.mockData.push(newRecord);
    return newRecord;
  }

  static async update(id: string, payload: { name: string }): Promise<TestRecord | null> {
    const item = this.mockData.find((record) => record.id === id);
    if (!item) return null;
    if (payload.name) item.name = payload.name;
    return item;
  }

  static async delete(id: string): Promise<boolean> {
    const index = this.mockData.findIndex((record) => record.id === id);
    if (index === -1) return false;
    this.mockData.splice(index, 1);
    return true;
  }

  static getTestData() {
    return {
      success: true,
      feature: "test",
      message: "Test service executed successfully",
      timestamp: new Date().toISOString(),
    };
  }
}

// Backward compatibility export
export const testService = TestService;

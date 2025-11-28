// Client-side helper functions for expense management
export async function deleteExpense(id: string): Promise<boolean> {
  console.log("Deleting expense with id:", id);
  try {
    const response = await fetch(`/api/expenses/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting expense:", error);
    return false;
  }
}

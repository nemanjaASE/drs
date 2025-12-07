import { useState, useEffect } from "react";
import { UserList } from "../components/UserList";
import { UserForm } from "../components/UserForm";
import { getUsers } from "../services/userService";
import type { User } from "../types";
import { Button } from "../../../components/Button";
import { FiChevronDown } from "react-icons/fi";
import { useUserCreatedToast } from "../hooks/useUserCreatedToast";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const result = await getUsers();
      setUsers(result);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  // Enable WebSocket toast notifications AND auto-refresh
  useUserCreatedToast({ onUserCreated: fetchUsers });

  const handleUserAdded = async () => {
    await fetchUsers();
    setShowForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold">Users</h1>

        <Button
          onClick={() => setShowForm((prev) => !prev)}
          variant="primary"
          size="sm"
          rightIcon={
            <FiChevronDown 
              className={`transition-transform ${showForm ? "rotate-180" : ""}`}
            />
          }
        >
          {showForm ? "Hide Form" : "Add User"}
        </Button>
      </div>
      
      {showForm && <UserForm onUserAdded={handleUserAdded} />}

      {loading ? <p>Loading users...</p> : <UserList users={users} />}
    </div>
  );
}
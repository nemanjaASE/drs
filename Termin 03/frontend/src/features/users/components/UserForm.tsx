import { useState, type ChangeEvent, type FormEvent } from "react";
import { createUser } from "../services/userService";
import { Button } from "../../../components/Button";
import { FiUserPlus } from "react-icons/fi";

interface UserFormProps {
  onUserAdded?: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    if (country) formData.append("country", country);
    if (birthDate) formData.append("birth_date", birthDate);
    if (profileImage) formData.append("profile_image", profileImage);

    try {
      await createUser(formData);
      setStatus("User added successfully!");
      setFirstName("");
      setLastName("");
      setCountry("");
      setBirthDate("");
      setProfileImage(null);

      if (onUserAdded) onUserAdded();
    } catch (err) {
      console.error(err);
      setStatus("Failed to add user.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 mb-6"
    >
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>

      <div>
        <label className="block mb-1 font-medium" htmlFor="firstName">
          First Name
        </label>
        <input
          placeholder="John"
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium" htmlFor="lastName">
          Last Name
        </label>
        <input
          placeholder="Doe"
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium" htmlFor="country">
          Country
        </label>
        <input
          placeholder="France"
          id="country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium" htmlFor="birthDate">
          Birth Date
        </label>
        <input
          placeholder="YYYY-MM-DD"
          id="birthDate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Profile Image</label>
        <div className="flex items-center gap-4">
          <label
            htmlFor="profileImage"
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded-md transition-colors"
          >
            {profileImage ? "Change File" : "Choose File"}
          </label>
          <span className="text-gray-600">
            {profileImage ? profileImage.name : "No file chosen"}
          </span>
        </div>
        <input
          id="profileImage"
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      <Button
        type="submit" 
        variant="primary" 
        size="md"
        leftIcon={<FiUserPlus />}   //below are other possible icons, just need different import
        //leftIcon={<FiUserCheck />}
        //leftIcon={<FiSave />}
        //leftIcon={<FiCheck />}
        loading={status === "Sending..."}
      >
        Add User
      </Button>

      {status && <p className="mt-2 text-gray-700">{status}</p>}
    </form>
  );
};

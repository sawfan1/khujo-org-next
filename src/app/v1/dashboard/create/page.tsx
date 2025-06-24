import Navbar from "@/components/dash-nav";
import VolunteerTaskForm from "@/components/task-form";


export default function Create() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <VolunteerTaskForm />
    </div>
  )
}
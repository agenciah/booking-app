"use client";
import BookingForm from "./components/bookingForm";
import DateTimePicker from "./components/dateTimePicker";
import AppointmentsDashboard from "./components/appointmentsDashboard";
import AuthComponent from "./components/auth_component";
import ServicesManager from "./components/manager/servicesManager";
import ClientsManager from "./components/manager/clientsManager";
import ScheduleManager from "./components/manager/scheduleManager";
import AppointmentsManager from "./components/manager/appointmentsManager";
import NotificationsManager from "./components/manager/notificationsManager";
import EmployeesManager from "./components/manager/employeesManager";
import AvailabilityManager from "./components/manager/availabilityManager";
import BookingManager from "./components/manager/bookingManager";
import { ThemeToggle } from "./components/themeToggle";

export default function Home() {
  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ThemeToggle />
      <nav className="mb-8">
        <AuthComponent />
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna 1: DateTimePicker y BookingForm */}
        <div className="flex flex-col gap-4">
          <DateTimePicker onSelect={(data) => console.log("Cita seleccionada:", data)} />
          <BookingForm onSubmit={(data) => console.log("Datos de la reserva:", data)} />
        </div>

        {/* Columna 2: AppointmentsDashboard */}
        <div>
          <AppointmentsDashboard />
        </div>

        <div>
          <ServicesManager/>
        </div>

        <div>
          <ClientsManager/>
        </div>

        <div>
          <ScheduleManager/>
        </div>
        <div>
          <AppointmentsManager/>
        </div>

        <div>
          <NotificationsManager/>
        </div>

        <div>
          <EmployeesManager/>
        </div>
        <div>
          <AvailabilityManager/>
        </div>
        <div>
          <BookingManager/>
        </div>
      </div>
    </div>
  );
}
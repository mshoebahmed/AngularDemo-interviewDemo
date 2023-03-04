
import {IAppointment} from '../service/appointment.service';

type logLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';



export const logAppointment = (appointment: IAppointment) => {
  const message = 'Appointment ' + appointment.id + ': ' + appointment.start + ' - ' + appointment.end;
  console.log(message);
};

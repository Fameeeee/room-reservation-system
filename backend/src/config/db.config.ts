import { Hotel } from 'src/hotels/hotels.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { Room } from 'src/rooms/rooms.entity';
import { StaffAssignment } from 'src/staff/staff-assignment.entity';
import { User } from 'src/users/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export default (): MysqlConnectionOptions => ({
  type: 'mysql',
  host: process.env.MYSQLHOST,
  port: parseInt(process.env.MYSQLPORT || '3306', 10),
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  synchronize: true,
  entities: [User, Hotel, Reservation, Room, StaffAssignment],
});

import { Hotel } from "src/hotels/hotels.entity";
import { User } from "src/users/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StaffAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.staffAssignments)
    staff: User;
    
    @ManyToOne(() => Hotel, (hotel) => hotel.staffAssignments)
    hotel: Hotel;
}
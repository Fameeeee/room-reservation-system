import { Room } from "src/rooms/rooms.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum ReservationStatus {
    PENDING = 'PENDING',
    CHECKED_IN = 'CHECKED_IN',
    CHECKED_OUT = 'CHECKED_OUT',
    CANCELLED = 'CANCELLED',
}

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.reservations)
    user: User;

    @ManyToOne(() => Room, (room) => room.reservations)
    room: Room;

    @Column({type: "enum", enum: ReservationStatus, default: ReservationStatus.PENDING})
    status: ReservationStatus;

    @Column({type: "date"})
    checkInDate: Date;

    @Column({type: "date"})
    checkOutDate: Date;

    @Column({type: "decimal", precision: 10, scale: 2})
    totalPrice: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
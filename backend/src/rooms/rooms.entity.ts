import { Hotel } from "src/hotels/hotels.entity";
import { Reservation } from "src/reservations/reservation.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum RoomType {
    SINGLE = 'SINGLE',
    DOUBLE = 'DOUBLE',
    SUITE = 'SUITE',
    DELUXE = 'DELUXE',
}

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
    hotel: Hotel;

    @Column()
    name: string

    @Column()
    type: RoomType;

    @Column()
    maxCapacity: number;

    @Column({type: "decimal", precision: 10, scale: 2})
    pricePerNight: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Reservation, (reservation) => reservation.room)
    reservations: Reservation[];
}
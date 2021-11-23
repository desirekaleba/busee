import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Currency } from './Currency';
import { User } from './User';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @Column({ unique: true, nullable: false })
  busLicenceNumber: string;

  @Column({ nullable: false })
  origin: string;

  @Column({ nullable: false })
  destination: string;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @Column('double', { nullable: false })
  fare: number;

  @ManyToOne(() => Currency, { nullable: false })
  @JoinColumn()
  currency: Currency;

  @Column({ nullable: false })
  capacity: number;

  @Column('simple-array')
  bookedSeats: number[];

  @Column()
  image: string;

  @Column('simple-array')
  images: string[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdOn: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedOn: Date;
}

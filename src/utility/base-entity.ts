import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    DeleteDateColumn
} from "typeorm";

export class baseEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @CreateDateColumn({
        type: 'time with time zone'
    })
    create_at: Date;
    @UpdateDateColumn({
        type: 'time with time zone'
    })
    update_at: Date;
    @Column({ nullable: false, default: 'ADMIN' })
    modifiedBy: string;
    @DeleteDateColumn()
    deletedAt?: Date;
}
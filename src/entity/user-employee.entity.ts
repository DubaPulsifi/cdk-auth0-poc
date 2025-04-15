import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserAccount } from './user-account.entity';
import { EnumColumn, IntegerColumn, JsonColumn, TextColumn, UuidColumn, AuditDataEntity, UserGender, UserStatus } from '../shared';

export class UserEmployeeGroup {
    group_id!: string;
    name!: string;
}

@Entity()
export class UserEmployee extends AuditDataEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @IntegerColumn()
    user_account_id!: number;

    @IntegerColumn()
    company_id!: number;

    @UuidColumn()
    employee_id!: string;

    @TextColumn({
        nullable: true,
    })
    department?: string;

    @UuidColumn({
        nullable: true,
    })
    department_id?: string;

    @JsonColumn({ nullable: true })
    groups?: UserEmployeeGroup[];

    @TextColumn({
        nullable: true,
    })
    external_employee_id?: string;

    @EnumColumn({
        nullable: true,
        enum: UserGender,
    })
    gender?: UserGender;

    @TextColumn({
        nullable: true,
    })
    nationality?: string;

    @TextColumn({
        nullable: true,
    })
    position?: string;

    @TextColumn({
        nullable: true,
    })
    manager_employee_id?: string;

    @TextColumn({
        nullable: true,
    })
    manager_display_name?: string;

    @Column({ type: Boolean, default: false })
    is_manager!: boolean;

    @Column({ type: Boolean, default: false })
    is_default_access!: boolean;

    @EnumColumn({ enum: UserStatus })
    status!: UserStatus;

    @Column({ type: Boolean, default: false })
    is_deleted!: boolean;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.employees)
    @JoinColumn({ name: 'user_account_id' })
    user_account?: UserAccount;
}

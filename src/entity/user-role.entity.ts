import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleLookup } from './role-lookup.entity';
import { UserAccount } from './user-account.entity';
import { EnumColumn, IntegerColumn, SoftDeleteColumn, UuidColumn, AuditDataEntity, RbacStatus } from '../shared';

@Entity()
export class UserRole extends AuditDataEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @IntegerColumn()
    user_account_id!: number;

    @IntegerColumn()
    company_id!: number;

    @UuidColumn({ nullable: true })
    talent_role_id!: string | null;

    @UuidColumn({ nullable: true })
    employee_role_id!: string | null;

    @UuidColumn({ nullable: true })
    console_role_id!: string | null;

    @Column({ type: Boolean, default: false })
    is_default_access!: boolean;

    @EnumColumn({ enum: RbacStatus })
    status!: RbacStatus;

    @SoftDeleteColumn()
    is_deleted!: boolean;

    @ManyToOne(
        () => UserAccount,
        (userAccount) => userAccount.user_applications,
    )
    @JoinColumn({ name: 'user_account_id' })
    user_account?: UserAccount;

    @ManyToOne(() => RoleLookup, (roleLookup) => roleLookup.talent_role)
    @JoinColumn({ name: 'talent_role_id' })
    talent_role?: RoleLookup;
}

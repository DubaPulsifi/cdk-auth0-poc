import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserAccount } from './user-account.entity';
import { EnumColumn, IntegerColumn, SoftDeleteColumn, AuditDataEntity, RbacResourceRestrictionPolicy, RbacStatus } from '../shared';

@Entity()
export class UserAdditionalPermission extends AuditDataEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @IntegerColumn()
    user_account_id!: number;

    @IntegerColumn({ nullable: false })
    company_id!: number;

    @IntegerColumn()
    permission_set_id!: number;

    @EnumColumn({ enum: RbacStatus })
    status!: RbacStatus;

    @SoftDeleteColumn()
    is_deleted!: boolean;

    @EnumColumn({ enum: RbacResourceRestrictionPolicy })
    resource_restriction_policy!: RbacResourceRestrictionPolicy;

    @ManyToOne(() => UserAccount, (userAccount) => userAccount.employees)
    @JoinColumn({ name: 'user_account_id' })
    user_account?: UserAccount;
}

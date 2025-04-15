import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleLookup } from './role-lookup.entity';
import { EnumColumn, IntegerColumn, SoftDeleteColumn, TextColumn, AuditDataEntity, RbacResourceRestrictionPolicy, RbacStatus } from '../shared';

@Entity()
export class RolePermission extends AuditDataEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @TextColumn()
    role_id!: string;

    @IntegerColumn()
    permission_set_id!: number;

    @EnumColumn({ enum: RbacStatus })
    status!: RbacStatus;

    @SoftDeleteColumn()
    is_deleted!: boolean;

    @EnumColumn({
        enum: RbacResourceRestrictionPolicy,
        nullable: true,
    })
    resource_restriction_policy!: RbacResourceRestrictionPolicy | null;

    @ManyToOne(() => RoleLookup, (roleLookup) => roleLookup.role_permissions)
    @JoinColumn({ name: 'role_id' })
    role_lookup?: RoleLookup;
}

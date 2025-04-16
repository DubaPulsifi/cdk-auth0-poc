import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { RolePermission } from "./role-permission.entity";
import { UserAccount } from "./user-account.entity";
import { UserRole } from "./user-role.entity";
import {
  EnumColumn,
  IntegerColumn,
  SoftDeleteColumn,
  TextColumn,
  AuditDataEntity,
  RbacApplication,
  RbacRole,
  RbacRoleType,
  RbacStatus,
} from "../shared";

@Entity('role_lookup')
export class RoleLookup extends AuditDataEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @TextColumn({ type: String })
  label!: string;

  @EnumColumn({ enum: RbacRole, nullable: true })
  role!: RbacRole | null;

  @EnumColumn({ enum: RbacApplication })
  application!: RbacApplication;

  @EnumColumn({ enum: RbacRoleType })
  role_type!: RbacRoleType;

  @IntegerColumn({ nullable: true })
  company_id!: number | null;

  @EnumColumn({ enum: RbacStatus })
  status!: RbacStatus;

  @SoftDeleteColumn()
  is_deleted!: boolean;

  @Column({ type: Boolean })
  is_form_hidden!: boolean;

  @OneToMany(() => UserRole, (userRole) => userRole.id)
  talent_role?: UserAccount;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.role_lookup
  )
  role_permissions?: RolePermission[];
}

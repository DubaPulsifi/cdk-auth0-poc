import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserAdditionalPermission } from './user-additional-permission.entity';
import { UserApplication } from './user-application.entity';
import { UserEmployee } from './user-employee.entity';
import { UserInvitation } from './user-invitation.entity';
import { UserPreference } from './user-preference.entity';
import { UserRole } from './user-role.entity';
import { DateTimeColumn, EnumColumn, JsonColumn, TextColumn, AuditDataEntity, UserExtTenant, UserStatus, StringColumn } from '../shared';

export class UserMeta {
    locale?: string; //en
    timezone?: string; //Asia/Kuala_Lumpur
}

@Entity('user_account')
export class UserAccount extends AuditDataEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @EnumColumn({
        enum: UserStatus,
    })
    status!: UserStatus;

    @StringColumn({
        length: 255,
    })
    email!: string;

    @StringColumn({
        length: 255,
    })
    first_name!: string;

    @StringColumn({
        length: 255,
        nullable: true,
    })
    last_name?: string;

    @EnumColumn({
        enum: UserExtTenant,
    })
    ext_tenant!: UserExtTenant;

    @StringColumn({
        length: 255,
        nullable: true,
    })
    ext_user_id?: string;

    @StringColumn({
        length: 255,
        nullable: true,
    })
    ext_connection_name?: string;

    @StringColumn({
        length: 2048,
        nullable: true,
    })
    picture_url?: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    is_connection_sso!: boolean;

    @DateTimeColumn({
        nullable: true,
    })
    last_login_at?: Date;

    @Column({
        type: 'boolean',
        nullable: true,
        default: false,
    })
    is_deleted?: boolean;

    @JsonColumn({
        type: 'simple-json',
        nullable: true,
    })
    user_meta?: UserMeta;

    @OneToMany(() => UserApplication, (userApp) => userApp.user_account)
    user_applications?: UserApplication[];

    @OneToMany(() => UserPreference, (userPref) => userPref.user_account)
    user_preferences?: UserPreference[];

    @OneToMany(() => UserInvitation, (userApp) => userApp.user_account)
    user_invitations?: UserInvitation[];

    @OneToMany(() => UserRole, (userRole) => userRole.user_account)
    user_roles?: UserRole[];

    @OneToMany(
        () => UserAdditionalPermission,
        (userAdditionalPermission) => userAdditionalPermission.user_account,
    )
    additional_permissions?: UserAdditionalPermission[];

    @OneToMany(() => UserEmployee, (userRole) => userRole.user_account)
    employees?: UserEmployee[];
}

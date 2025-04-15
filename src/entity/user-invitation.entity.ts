import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { UserAccount } from './user-account.entity';
import { DateTimeColumn, EnumColumn, IntegerColumn, JsonColumn, TextColumn, AuditDataEntity, WebApp } from '../shared';

@Entity()
export class UserInvitation extends AuditDataEntity {
    @PrimaryColumn({
        type: 'uuid',
    })
    id!: string;

    @IntegerColumn()
    company_id!: number;

    @IntegerColumn()
    user_account_id!: number;

    @IntegerColumn()
    app_id!: number;

    @EnumColumn({
        enum: WebApp,
    })
    app!: WebApp;

    @TextColumn({
        length: 255,
    })
    email!: string;

    @TextColumn({
        length: 255,
    })
    first_name!: string;

    @TextColumn({
        length: 255,
        nullable: true,
    })
    last_name?: string;

    @JsonColumn({
        nullable: true,
    })
    modules!: object;

    @DateTimeColumn()
    expired_at!: Date;

    @DateTimeColumn({
        nullable: true,
    })
    accepted_at?: Date;

    @ManyToOne(
        () => UserAccount,
        (userAccount) => userAccount.user_invitations,
    )
    @JoinColumn({ name: 'user_account_id' })
    user_account?: UserAccount;
}

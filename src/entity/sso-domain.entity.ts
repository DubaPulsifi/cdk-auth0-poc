import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Company } from './company.entity';
import { IntegerColumn, SoftDeleteColumn, TextColumn, AuditDataEntity } from '../shared';

@Entity()
export class SsoDomain extends AuditDataEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @TextColumn({
        length: 255,
        unique: true,
    })
    domain!: string;

    @IntegerColumn({
        nullable: true,
    })
    default_auto_join_company_id?: number | null;

    @SoftDeleteColumn()
    is_deleted?: boolean;

    @ManyToOne(
        () => Company,
        (company) => company.default_auto_join_sso_domains,
    )
    @JoinColumn({ name: 'default_auto_join_company_id' })
    default_auto_join_company?: Company;
}

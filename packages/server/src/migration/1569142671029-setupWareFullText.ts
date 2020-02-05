import { MigrationInterface, QueryRunner } from "typeorm";

export class setupWareFullText1569142671029 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`
        update ware
        set document = to_tsvector(name || ' ' || manufacturername || ' ' || irc);

        CREATE INDEX document_ware_idx
        ON ware
        USING GIN (document);

        CREATE OR REPLACE FUNCTION ware_tsvector_trigger() RETURNS trigger AS $$
        begin
        new.document :=
        to_tsvector('simple', coalesce(new.name, ''))
        || to_tsvector('simple', coalesce(new.manufacturername, ''))
        || to_tsvector('simple', coalesce(new.irc, ''));
        return new;
        end
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER waretsvectorupdate BEFORE INSERT OR UPDATE
            ON ware FOR EACH ROW EXECUTE PROCEDURE ware_tsvector_trigger();
            
            
            

        update ware_type
        set document = to_tsvector(name || ' ' || "enName" );
        
        CREATE INDEX document_ware_type_idx
        ON state
        USING GIN (document);

        CREATE OR REPLACE FUNCTION ware_type_tsvector_trigger() RETURNS trigger AS $$
        begin
        new.document :=
        to_tsvector('simple', coalesce(new.name, ''))
        || to_tsvector('simple', coalesce(new."enName", ''));
        return new;
        end
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER waretypetsvectorupdate BEFORE INSERT OR UPDATE
            ON ware_type FOR EACH ROW EXECUTE PROCEDURE ware_type_tsvector_trigger();
            

            
                        
        update ware_class
        set document = to_tsvector(name || ' ' || "enName" );
        
        CREATE INDEX document_ware_class_idx
        ON state
        USING GIN (document);

        CREATE OR REPLACE FUNCTION ware_class_tsvector_trigger() RETURNS trigger AS $$
        begin
        new.document :=
        to_tsvector('simple', coalesce(new.name, ''))
        || to_tsvector('simple', coalesce(new."enName", ''));
        return new;
        end
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER wareclasstsvectorupdate BEFORE INSERT OR UPDATE
            ON ware_class FOR EACH ROW EXECUTE PROCEDURE ware_class_tsvector_trigger();




        update ware_group 
        set document = to_tsvector(name || ' ' || "enName" );
        
        CREATE INDEX document_ware_group_idx
        ON state
        USING GIN (document);

        CREATE OR REPLACE FUNCTION ware_group_tsvector_trigger() RETURNS trigger AS $$
        begin
        new.document :=
        to_tsvector('simple', coalesce(new.name, ''))
        || to_tsvector('simple', coalesce(new."enName", ''));
        return new;
        end
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER waregrouptsvectorupdate BEFORE INSERT OR UPDATE
            ON ware_group FOR EACH ROW EXECUTE PROCEDURE ware_group_tsvector_trigger();





        update ware_model
        set document = to_tsvector(name || ' ' || "enName" );
        
        CREATE INDEX document_ware_model_idx
        ON state
        USING GIN (document);

        CREATE OR REPLACE FUNCTION ware_model_tsvector_trigger() RETURNS trigger AS $$
        begin
        new.document :=
        to_tsvector('simple', coalesce(new.name, ' '))
        || to_tsvector('simple', coalesce(new."enName", ' '));
        return new;
        end
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER waremodeltsvectorupdate BEFORE INSERT OR UPDATE
            ON ware_model FOR EACH ROW EXECUTE PROCEDURE ware_model_tsvector_trigger();


            
        update state
        set document = to_tsvector(name);
        
        CREATE INDEX document_state_idx
        ON state
        USING GIN (document);

        CREATE OR REPLACE FUNCTION state_tsvector_trigger() RETURNS trigger AS $$
        begin
        new.document :=
        to_tsvector('simple', coalesce(new.name, ''));
        return new;
        end
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER statetsvectorupdate BEFORE INSERT OR UPDATE
            ON state FOR EACH ROW EXECUTE PROCEDURE state_tsvector_trigger();



        update city
        set document = to_tsvector(name);
        
        CREATE INDEX document_city_idx
        ON city
        USING GIN (document);

        CREATE OR REPLACE FUNCTION city_tsvector_trigger() RETURNS trigger AS $$
        begin
        new.document :=
        to_tsvector('simple', coalesce(new.name, ''));
        return new;
        end
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER citytsvectorupdate BEFORE INSERT OR UPDATE
            ON city FOR EACH ROW EXECUTE PROCEDURE city_tsvector_trigger();
        


        update site
        set document = to_tsvector(name || ' ' || coalesce(ceoname, '') || ' ' || coalesce(contact, ''));
        
        CREATE INDEX document_site_idx
        ON site
        USING GIN (document);

        CREATE OR REPLACE FUNCTION site_tsvector_trigger() RETURNS trigger AS $$
        begin
        new.document :=
        to_tsvector('simple', coalesce(new.name, ''))
        || to_tsvector('simple', coalesce(new.ceoname, ''))
        || to_tsvector('simple', coalesce(new.contact, ''));
        return new;
        end
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER sitetsvectorupdate BEFORE INSERT OR UPDATE
            ON site FOR EACH ROW EXECUTE PROCEDURE site_tsvector_trigger();



        update "user"
        set document = to_tsvector("firstName" || ' ' || "lastName" || ' ' || ssn || ' ' || CAST(phone as text));
        
        CREATE INDEX document_user_idx
        ON "user"
        USING GIN (document);

        CREATE OR REPLACE FUNCTION user_tsvector_trigger() RETURNS trigger AS $$
        begin
        new.document :=
        to_tsvector('simple', new."firstName")
        || to_tsvector('simple', new."lastName")
        || to_tsvector('simple', new.ssn)
        || to_tsvector('simple', CAST(new.phone as text));
        return new;
        end
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER usertsvectorupdate BEFORE INSERT OR UPDATE
            ON "user" FOR EACH ROW EXECUTE PROCEDURE user_tsvector_trigger();



        update "order"
        set document = to_tsvector(CAST(trackingcode as text));
        
        CREATE INDEX document_order_idx
        ON "order"
        USING GIN (document);

        CREATE OR REPLACE FUNCTION order_tsvector_trigger() RETURNS trigger AS $$
        begin
        new.document :=
        to_tsvector('simple', CAST(new.trackingcode as text));
        return new;
        end
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER ordertsvectorupdate BEFORE INSERT OR UPDATE
            ON "order" FOR EACH ROW EXECUTE PROCEDURE order_tsvector_trigger();

        `);
    }

    public async down(_queryRunner: QueryRunner): Promise<any> {}
}

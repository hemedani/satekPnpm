import { City } from "../entity/City";
import { Manufacturer } from "../entity/Manufacturer";
import {
    ActivityScope,
    DeliveryTime,
    Organization,
    PaymentDeadLine,
    ServiceRange,
    Store,
    StoreStatus,
    Unit,
    University,
    WorkingShift,
    ActivityType
} from "../entity/Site";
import { State } from "../entity/State";
import { Stuff, LongPayment } from "../entity/Stuff";
import { User } from "../entity/User";
import { UserRole, UserToSite } from "../entity/UserToSite";
import { Ware } from "../entity/Ware";
import { WareGroup } from "../entity/WareGroup";
import { LegalPerson, Gender, StoreType, StoreDetails } from "../entity/StoreDetails";
import { Order_statistic } from "../entity/Order_statistic";
import { WareType } from "../entity/WareType";
import { WareClass } from "../entity/WareClass";
import { WareModel } from "../entity/WareModel";
import { ClassGroup } from "../entity/ClassGroup";
import { Category } from "../entity/Category";
import faker from "faker/locale/fa";

export async function createData() {
    const state = await State.create({
        name: "همدان",
        enName: "Hamadan"
    }).save();

    const city = await City.create({
        name: "همدان",
        enName: "Hamadan",
        stateId: state.id
    }).save();

    const university = await University.create({
        name: "دانشگاه علوم پزشکی همدان",
        address: "آدرس دانشگاه",
        location: "لوکیشن دانشگاه",
        stateId: state.id,
        cityId: city.id
    }).save();

    const organization = await Organization.create({
        name: "بیمارستان فرشچیان",
        address: "آدرس بیمارستان فرشچیان",
        universityId: university.id,
        stateId: state.id,
        cityId: city.id
    }).save();

    const category = await Category.create({
        name: "پاراکلینیک",
        enName: "Paraclinic",
        universityId: university.id,
        organizationId: organization.id,
        cityId: city.id,
        stateId: state.id
    }).save();

    const category2 = await Category.create({
        name: "اتاق عمل",
        enName: "Operating room",
        universityId: university.id,
        organizationId: organization.id,
        cityId: city.id,
        stateId: state.id
    }).save();

    const category3 = await Category.create({
        name: "درمانگاه",
        enName: "Clinic",
        universityId: university.id,
        organizationId: organization.id,
        cityId: city.id,
        stateId: state.id
    }).save();

    const category4 = await Category.create({
        name: "بخش ها",
        enName: "Categories",
        universityId: university.id,
        organizationId: organization.id,
        cityId: city.id,
        stateId: state.id
    }).save();

    const wareType = await WareType.create({
        name: "تجهیزات پزشکی",
        enName: "Medical"
    }).save();

    const wareClass = await WareClass.create({
        wareTypeId: wareType.id,
        name: "یک کلاس برای دارو ها",
        enName: "enName for WareClass"
    }).save();

    const manufacturer = await Manufacturer.create({
        name: "مونوبایند",
        enName: "enName for manufacturer",
        country: "USA"
    }).save();

    const wareGroup = await WareGroup.create({
        name: "یک گروه برای دارو ها",
        enName: "enname for wareGroup",
        wareTypeId: wareType.id
    }).save();

    await ClassGroup.create({
        wareClassId: wareClass.id,
        wareGroupId: wareGroup.id
    }).save();

    const wareModel = await WareModel.create({
        name: "یک مدل برای دارو ها",
        enName: "enname for wareModel",
        wareTypeId: wareType.id,
        wareClassId: wareClass.id,
        wareGroupId: wareGroup.id
    }).save();

    const ware = await Ware.create({
        name: "کیت تی اس اچ شرکت مونوبایند",
        enName: "kit TSH",
        irc: "12345678910",
        price: 100000,
        manufacturerId: manufacturer.id,
        manufacturername: manufacturer.name,
        wareTypeId: wareType.id,
        wareClassId: wareClass.id,
        wareGroupId: wareGroup.id,
        wareModelId: wareModel.id,
        brand: "monobind"
    }).save();
    const statistics = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();
    const statistics2 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();
    const statistics3 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();
    const statistics4 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();
    const statistics5 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();
    const statistics6 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();
    const statistics7 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();
    const statistics8 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();
    const statistics9 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();
    const statistics10 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();
    const statistics11 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();

    const statistics12 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();

    const statistics13 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();

    const statistics14 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();

    const statistics15 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();

    const statistics16 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();

    const statistics17 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();

    const statistics18 = await Order_statistic
        .create({
            partialDeliveryNumber: 0,
            pendingForPayNumber: 0,
            pendingInAcountantNumber: 0,
            pendingInStoreNumber: 0,
            pendingInUnitHeadNumber: 0,
            pendingInOrgHeadNumber: 0,
            paidNumber: 0,
            preparationByStoreNumber: 0,
            rejectedByEmployeeNumber: 0,
            rejectedByOrgHeadNumber: 0,
            rejectedByStoreNumber: 0,
            rejectedByUnitHeadNumber: 0,
            rejectedForPayNumber: 0,
            sentByStoreNumber: 0
        })
        .save();

    //Category 1 units
    const unit = await Unit.create({
        name: "واحد آزمایشگاه",
        address: "آدرس واحد آزمایشگاه",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics.id,
        categoryId: category.id
    }).save();

    await Unit.create({
        name: "واحد رادیولوژی",
        address: "آدرس واحد رادیولوژی",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics2.id,
        categoryId: category.id
    }).save();

    await Unit.create({
        name: "واحد سیتی اسکن",
        address: "آدرس واحد سیتی اسکن",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics3.id,
        categoryId: category.id
    }).save();

    await Unit.create({
        name: " MRI واحد",
        address: " MRI واحد آدرس",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics4.id,
        categoryId: category.id
    }).save();

    //Category 2 unit

    await Unit.create({
        name: "واحد جراحی عمومی",
        address: "آدرس واحد جراحی عمومی",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics5.id,
        categoryId: category2.id
    }).save();

    await Unit.create({
        name: "واحد چشم",
        address: "آدرس واحد چشم",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics6.id,
        categoryId: category2.id
    }).save();

    await Unit.create({
        name: "واحد کودکان و نوزادان",
        address: "آدرس واحد کودکان و نوزادان",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics7.id,
        categoryId: category2.id
    }).save();

    await Unit.create({
        name: "واحد اورورلوژی",
        address: "آدرس واحد اورورلوژی",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics8.id,
        categoryId: category2.id
    }).save();

    await Unit.create({
        name: "واحد فک صورت",
        address: "آدرس واحد فک صورت",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics9.id,
        categoryId: category2.id
    }).save();

    await Unit.create({
        name: "واحد پلاستیک",
        address: "آدرس واحد پلاستیک",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics10.id,
        categoryId: category2.id
    }).save();

    await Unit.create({
        name: "واحد توراکس",
        address: "آدرس واحد توراکس",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics11.id,
        categoryId: category2.id
    }).save();

    await Unit.create({
        name: "واحد زنان و لاپاروسکوپی ",
        address: "آدرس واحد زنان و لاپاروسکوپی ",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics12.id,
        categoryId: category2.id
    }).save();

    //Category 3 units

    await Unit.create({
        name: "واحد مغز و اعصاب",
        address: "آدرس واحد مغز و اعصاب",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics13.id,
        categoryId: category3.id
    }).save();

    await Unit.create({
        name: "واحد درمانگاه قلب",
        address: "آدرس واحد درمانگاه قلب",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics14.id,
        categoryId: category3.id
    }).save();
    await Unit.create({
        name: "واحد دندانپزشکی",
        address: "آدرس واحد دندانپزشکی ",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics15.id,
        categoryId: category3.id
    }).save();
    //Category 4 units

    await Unit.create({
        name: "واحد اطفال",
        address: "آدرس واحد اطفال",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics16.id,
        categoryId: category4.id
    }).save();

    await Unit.create({
        name: "واحد ااورژانس",
        address: "آدرس واحد اورژانس",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics17.id,
        categoryId: category4.id
    }).save();

    await Unit.create({
        name: "واحد جراحی عمومی",
        address: "آدرس واحد جراحی عمومی ",
        organizationId: organization.id,
        universityId: university.id,
        stateId: state.id,
        cityId: city.id,
        orderStatisticId: statistics18.id,
        categoryId: category4.id
    }).save();

    //مستر
    const masterUser = await User.create({
        firstName: "امیر",
        lastName: "امیری",
        phone: 989396880100,
        password: "123456",
        ssn: "3890918527",
        devices: [],
        isActive: true
    }).save();

    await UserToSite.create({
        userId: masterUser.id,
        role: UserRole.Master
    }).save();

    //رییس بیمارستان
    const organizationHead = await User.create({
        firstName: "سید امیر",
        lastName: "حسینی",
        phone: 989381028800,
        password: "123456",
        ssn: "1234589851",
        devices: [],
        isActive: true
    }).save();

    await UserToSite.create({
        userId: organizationHead.id,
        role: UserRole.OrganizationHead,
        siteId: organization.id
    }).save();

    await UserToSite.create({
        userId: organizationHead.id,
        role: UserRole.Admin,
        siteId: organization.id
    }).save();

    //کارمند واحد
    const unitEmployee = await User.create({
        firstName: "مهدی",
        lastName: "تعالی",
        phone: 989380666037,
        password: "123456",
        ssn: "1234589856",
        devices: [],
        isActive: true
    }).save();
    await UserToSite.create({
        userId: unitEmployee.id,
        role: UserRole.UnitEmployee,
        siteId: unit.id
    }).save();
    // const employeeList: string[] = [
    //     "علی @ قیاسی",
    //     "آرمان @ مجیدی",
    //     "آرش @ ریحانی",
    //     "سعید @ فتحی",
    //     "رضا @ علوی"
    // ];
    // const headUnitEmployeeList: string[] = [
    //     "رضا @ الماسی",
    //     "محمد @ رسولی",
    //     "حسین @ ایمانی",
    //     "حسن @ افتخاری",
    //     "سجاد @ محسنی"
    // ];
    //رییس واحد
    const unitHead = await User.create({
        firstName: "احسان",
        lastName: "عاکفی",
        phone: 989185005315,
        password: "123456",
        ssn: "1234589857",
        devices: [],
        isActive: true
    }).save();
    const headHospitalList: string[] = [
        "صادق @ الوندی",
        "باقر @ کاظمی",
        "هادی @ موسوی",
        "محمد امین @ حسینی",
        "محمد طاها @ حکیم"
    ];
    await UserToSite.create({
        userId: unitHead.id,
        role: UserRole.UnitHead,
        siteId: unit.id
    }).save();

    const storeDetail = await StoreDetails.create({
        economicCode: "123456789",
        postalCode: "123456789",
        email: "email@email.com",
        ceoSsn: "12345689",
        mobileNumber: 989125487921,
        ceoBirthDate: new Date("2015-03-25T12:00:00Z"),
        ceoGender: Gender.Male,
        ceoCityId: city.id,
        ceoStateId: state.id,
        ceoPostalCode: "123456789",
        ceoAddress: "خیابان الوندی",
        ceoContact: "456798123",
        ceoEmail: "ceoEmail@email.com",
        cardMelliUrl: "cardMelliUrl",
        lastNewspaperUrl: "lastNewspaperUrl",
        storeType: StoreType.Company,
        legalPerson: LegalPerson.Juridical,
        mojavvezUrl: "MojavvezUrl",
        ceoPhotoUrl: "ceoPhotoUrl",
        bankCardNumber: "7894563212547896",
        shebaNumber: "45678945613246578946513456789798",
        nameOfAccountHolder: "رضا احمدی",
        bankName: "بانک ملت",
        certificateNumber: "23453445656567678679",
        certificateExpireDate: new Date("2020-03-25T12:00:00Z")
    }).save();

    const store = await Store.create({
        name: "فروشگاه طبیب",
        ceoname: "اسم کامل مدیر",
        address: "خیابان شریعتی",
        cityId: city.id,
        stateId: state.id,
        workingShift: WorkingShift.MorningAndAfternoon,
        paymentDeadLine: PaymentDeadLine.ThreeMonth,
        serviceRange: [ServiceRange.City, ServiceRange.State],
        fastDelivery: true,
        status: StoreStatus.Confirmed,
        activityScope: ActivityScope.Medicine,
        activityType: ActivityType.Dropshipper,
        cityDeliveryTime: DeliveryTime.TwoDay,
        stateDeliveryTime: DeliveryTime.ThreeDay,
        storeDetails: storeDetail
    }).save();

    const storeDetail3 = await StoreDetails.create({
        economicCode: "1234356789",
        postalCode: "1234534789",
        email: "emdail@email.com",
        ceoSsn: "123445689",
        mobileNumber: 989125483921,
        ceoBirthDate: new Date("2015-03-25T12:00:00Z"),
        ceoGender: Gender.Male,
        ceoCityId: city.id,
        ceoStateId: state.id,
        ceoPostalCode: "1233456789",
        ceoAddress: "خیابان پردیس",
        ceoContact: "4567983123",
        ceoEmail: "ceoEwmail@email.com",
        cardMelliUrl: "cardMelsliUrl",
        lastNewspaperUrl: "lastNewsspaperUrl",
        storeType: StoreType.Company,
        legalPerson: LegalPerson.Juridical,
        mojavvezUrl: "MojavsvezUrl",
        ceoPhotoUrl: "ceoPhsotoUrl",
        bankCardNumber: "78945653212547896",
        shebaNumber: "456789445613246578946513456789798",
        nameOfAccountHolder: "علی قیاسی",
        bankName: "بانک ملی",
        certificateNumber: "23453445656567678679",
        certificateExpireDate: new Date("2020-03-25T12:00:00Z")
    }).save();

    const store3 = await Store.create({
        name: "فروشگاه طبیب",
        ceoname: "امیرحسین معیاری",
        address: "خیابان شریعتی",
        cityId: city.id,
        stateId: state.id,
        workingShift: WorkingShift.MorningAndAfternoon,
        paymentDeadLine: PaymentDeadLine.ThreeMonth,
        serviceRange: [ServiceRange.City, ServiceRange.State],
        fastDelivery: true,
        status: StoreStatus.NotConfirmed,
        activityScope: ActivityScope.Medicine,
        activityType: ActivityType.Dropshipper,
        cityDeliveryTime: DeliveryTime.TwoDay,
        stateDeliveryTime: DeliveryTime.ThreeDay,
        storeDetails: storeDetail3
    }).save();

    const storeDetail2 = await StoreDetails.create({
        economicCode: "1234356789",
        postalCode: "1234534789",
        email: "emdail@email.com",
        ceoSsn: "123445689",
        mobileNumber: 989125483921,
        ceoBirthDate: new Date("2015-03-25T12:00:00Z"),
        ceoGender: Gender.Male,
        ceoCityId: city.id,
        ceoStateId: state.id,
        ceoPostalCode: "1233456789",
        ceoAddress: "خیابان پردیس",
        ceoContact: "4567983123",
        ceoEmail: "ceoEwmail@email.com",
        cardMelliUrl: "cardMelsliUrl",
        lastNewspaperUrl: "lastNewsspaperUrl",
        storeType: StoreType.Company,
        legalPerson: LegalPerson.Juridical,
        mojavvezUrl: "MojavsvezUrl",
        ceoPhotoUrl: "ceoPhsotoUrl",
        bankCardNumber: "78945653212547896",
        shebaNumber: "456789445613246578946513456789798",
        nameOfAccountHolder: "علی قیاسی",
        bankName: "بانک ملی",
        certificateNumber: "23453445656567678679",
        certificateExpireDate: new Date("2020-03-25T12:00:00Z")
    }).save();

    const store2 = await Store.create({
        name: "فروشگاه سینا",
        ceoname: "  علی کارگر",
        address: "خیابان بو علی",
        cityId: city.id,
        stateId: state.id,
        workingShift: WorkingShift.MorningAndAfternoon,
        paymentDeadLine: PaymentDeadLine.ThreeMonth,
        serviceRange: [ServiceRange.City, ServiceRange.State],
        fastDelivery: true,
        status: StoreStatus.Confirmed,
        activityScope: ActivityScope.Medicine,
        activityType: ActivityType.Dropshipper,
        cityDeliveryTime: DeliveryTime.sixDay,
        stateDeliveryTime: DeliveryTime.OneDay,
        storeDetails: storeDetail2
    }).save();

    //فروشنده ۲
    const storeHead2 = await User.create({
        firstName: "علی",
        lastName: "کارگر",
        phone: 989185409343,
        password: "124543456",
        ssn: "3423545434",
        devices: [],
        isActive: true
    }).save();

    //فروشنده ۱
    const storeHead = await User.create({
        firstName: "امیرحسین",
        lastName: "معیاری",
        phone: 989187143119,
        password: "12454433456",
        ssn: "342354535434",
        devices: [],
        isActive: true
    }).save();

    await UserToSite.create({
        userId: storeHead.id,
        role: UserRole.StoreHead,
        siteId: store.id
    }).save();

    await UserToSite.create({
        userId: storeHead2.id,
        role: UserRole.StoreHead,
        siteId: store2.id
    }).save();

    // const stuff = await Stuff.create({
    await Stuff.create({
        expiration: new Date("2020-03-25T12:00:00Z"),
        inventoryNo: 100,
        hasAbsolutePrice: true,
        price: 20000,
        wareId: ware.id,
        wareTypeId: ware.wareTypeId,
        wareClassId: ware.wareClassId,
        wareGroupId: ware.wareGroupId,
        wareModelId: ware.wareModelId,
        storeId: store.id,
        barcode: 626234854457
    }).save();

    // const stuff2 = await Stuff.create({
    await Stuff.create({
        expiration: new Date("2020-03-25T12:00:00Z"),
        inventoryNo: 100,
        hasAbsolutePrice: true,
        price: 20000,
        wareId: ware.id,
        wareTypeId: ware.wareTypeId,
        wareClassId: ware.wareClassId,
        wareGroupId: ware.wareGroupId,
        wareModelId: ware.wareModelId,
        storeId: store3.id,
        barcode: 626234854457
    }).save();

    // await Order.create({
    //     status: OrderStatus.pendingInStore,
    //     storeId: store2.id,
    //     num: 2,
    //     requestorUser: unitEmployee,
    //     fastDelivery: true,
    //     wareId: ware.id,
    //     stuffId: stuff.id,
    //     unitId: unit.id,
    //     wareTypeId: wareType.id,
    //     wareClassId: ware.wareClassId,
    //     wareGroupId: ware.wareGroupId,
    //     wareModelId: ware.wareModelId,
    //     organizationId: organization.id,
    //     chosenPayment: ChosenPayment.Incash
    // }).save();

    // await Order.create({
    //     status: OrderStatus.pendingInStore,
    //     storeId: store2.id,
    //     num: 10,
    //     requestorUser: unitHead,
    //     organizationId: organization.id,
    //     fastDelivery: false,
    //     wareId: ware.id,
    //     stuffId: stuff2.id,
    //     unitId: unit.id,
    //     wareTypeId: wareType.id,
    //     wareClassId: ware.wareClassId,
    //     wareGroupId: ware.wareGroupId,
    //     wareModelId: ware.wareModelId,
    //     chosenPayment: ChosenPayment.Incash
    // }).save();

    // await Order.create({
    //     status: OrderStatus.pendingInStore,
    //     storeId: store.id,
    //     num: 2,
    //     requestorUser: unitEmployee,
    //     fastDelivery: true,
    //     wareTypeId: wareType.id,
    //     wareClassId: ware.wareClassId,
    //     wareGroupId: ware.wareGroupId,
    //     wareModelId: ware.wareModelId,
    //     wareId: ware.id,
    //     stuffId: stuff.id,
    //     unitId: unit.id,
    //     organizationId: organization.id,
    //     chosenPayment: ChosenPayment.Incash
    // }).save();

    // await Order.create({
    //     status: OrderStatus.pendingInStore,
    //     storeId: store.id,
    //     num: 10,
    //     requestorUser: unitHead,
    //     fastDelivery: false,
    //     wareTypeId: wareType.id,
    //     wareClassId: ware.wareClassId,
    //     wareGroupId: ware.wareGroupId,
    //     wareModelId: ware.wareModelId,
    //     wareId: ware.id,
    //     stuffId: stuff2.id,
    //     unitId: unit.id,
    //     organizationId: organization.id,
    //     chosenPayment: ChosenPayment.Incash
    // }).save();

    const wareFake = [
        "نوار تست قند خون شرکت مونوبایند",
        "کیت آنژیو شرکت مونوبایند",
        "ایمپلنت استخوانی شرکت مونوبایند",
        "کاغذ پرینتر سونوگرافی شرکت کانن",
        "سرنگ سوزن متحرک شرکت رازک",
        "رانژور شرکت مونوبایند",
        "کلمپ فورستر شرکت سازگار گستر",
        "کورت شرکت رازک",
        "درماتوم شرکت اتوبیو",
        "رترکتور دیور شرکت ریاکیت",
        "رایت انگل شرکت ریاکیت"
    ];
    const brands = [
        "HMD",
        "TSMC",
        "HTV",
        "YARN",
        "MONOREPO",
        "AJILE",
        "ASWE",
        "QWERTY",
        "POPCORN",
        "ELEPHENT",
        "APPLE"
    ];
    for (let i = 0; i < 20; i++) {}
    let allowedWare: string[] = [];
    for (let i = 0; i < wareFake.length; i++) {
        const wareList = await Ware.create({
            name: wareFake[i],
            enName: brands[i],
            irc: String(Math.floor(Math.random() * (10000000 - 1000000)) + 1000000),
            price: Math.floor(Math.random() * (100000 - 10000)) + 10000,
            manufacturerId: manufacturer.id,
            wareTypeId: wareType.id,
            wareClassId: wareClass.id,
            wareGroupId: wareGroup.id,
            wareModelId: wareModel.id,
            manufacturername: manufacturer.name,
            brand: "parsazmoon"
        }).save();
        allowedWare.push(wareList.id);

        const createRandom = () => Math.random(); //between 0 and 1
        const createRandomprice = () => Math.floor(Math.random() * (100000 - 10000)) + 10000;

        let price = createRandomprice();
        let twoMonthPricePercent = createRandom();
        let threeMonthPricePercent = twoMonthPricePercent + createRandom();
        let fourMonthPricePercent = threeMonthPricePercent + createRandom();
        let fiveMonthPricePercent = fourMonthPricePercent + createRandom();
        let sixMonthPricePercent = fiveMonthPricePercent + createRandom();
        let sevenMonthPricePercent = sixMonthPricePercent + createRandom();
        let eightMonthPricePercent = sevenMonthPricePercent + createRandom();
        let nineMonthPricePercent = eightMonthPricePercent + createRandom();
        let tenMonthPricePercent = nineMonthPricePercent + createRandom();
        let elevenMonthPricePercent = tenMonthPricePercent + createRandom();
        let twelveMonthPricePercent = elevenMonthPricePercent + createRandom();
        let eighteenMonthPricePercent = twelveMonthPricePercent + createRandom() + 3;
        let twentyFourMonthPricePercent = eighteenMonthPricePercent + createRandom() + 3;
        let twoMonth = Math.ceil((twoMonthPricePercent * price) / 100) + price;
        let threeMonth = Math.ceil((threeMonthPricePercent * price) / 100) + price;
        let fourMonth = Math.ceil((fourMonthPricePercent * price) / 100) + price;
        let fiveMonth = Math.ceil((fiveMonthPricePercent * price) / 100) + price;
        let sixMonth = Math.ceil((sixMonthPricePercent * price) / 100) + price;
        let sevenMonth = Math.ceil((sevenMonthPricePercent * price) / 100) + price;
        let eightMonth = Math.ceil((eightMonthPricePercent * price) / 100) + price;
        let nineMonth = Math.ceil((nineMonthPricePercent * price) / 100) + price;
        let tenMonth = Math.ceil((tenMonthPricePercent * price) / 100) + price;
        let elevenMonth = Math.ceil((elevenMonthPricePercent * price) / 100) + price;
        let twelveMonth = Math.ceil((twelveMonthPricePercent * price) / 100) + price;
        let eighteenMonth = Math.ceil((eighteenMonthPricePercent * price) / 100) + price;
        let twentyFourMonth = Math.ceil((twentyFourMonthPricePercent * price) / 100) + price;
        await Stuff.create({
            expiration: new Date("2021-03-25T12:00:00Z"),
            inventoryNo: Math.floor(Math.random() * (300 - 50)) + 50,
            hasAbsolutePrice: true,
            price,
            wareId: wareList.id,
            wareTypeId: ware.wareTypeId,
            wareClassId: ware.wareClassId,
            wareGroupId: ware.wareGroupId,
            wareModelId: ware.wareModelId,
            storeId: store.id,
            availableLongPayment: [
                LongPayment.twoMonth,
                LongPayment.threeMonth,
                LongPayment.fourMonth,
                LongPayment.fiveMonth,
                LongPayment.sixMonth,
                LongPayment.sevenMonth,
                LongPayment.eightMonth,
                LongPayment.nineMonth,
                LongPayment.tenMonth,
                LongPayment.elevenMonth,
                LongPayment.twelveMonth,
                LongPayment.eighteenMonth,
                LongPayment.twentyFourMonth
            ],
            twoMonthPricePercent,
            twoMonth,
            threeMonthPricePercent,
            threeMonth,
            fourMonthPricePercent,
            fourMonth,
            fiveMonthPricePercent,
            fiveMonth,
            sixMonthPricePercent,
            sixMonth,
            sevenMonthPricePercent,
            sevenMonth,
            eightMonthPricePercent,
            eightMonth,
            nineMonthPricePercent,
            nineMonth,
            tenMonthPricePercent,
            tenMonth,
            elevenMonthPricePercent,
            elevenMonth,
            twelveMonthPricePercent,
            twelveMonth,
            eighteenMonthPricePercent,
            eighteenMonth,
            twentyFourMonthPricePercent,
            twentyFourMonth,
            barcode: 62656798367 + Math.floor(Math.random() * (100 - 10)) + 10
        }).save();

        twoMonthPricePercent = createRandom();
        fourMonthPricePercent = twoMonthPricePercent + createRandom();
        sixMonthPricePercent = fourMonthPricePercent + createRandom();
        eightMonthPricePercent = sixMonthPricePercent + createRandom();
        tenMonthPricePercent = eightMonthPricePercent + createRandom();
        twelveMonthPricePercent = tenMonthPricePercent + createRandom();
        eighteenMonthPricePercent = twelveMonthPricePercent + createRandom() + 3;
        twentyFourMonthPricePercent = eighteenMonthPricePercent + createRandom() + 3;
        twoMonth = Math.ceil((twoMonthPricePercent * price) / 100) + price;
        fourMonth = Math.ceil((fourMonthPricePercent * price) / 100) + price;
        sixMonth = Math.ceil((sixMonthPricePercent * price) / 100) + price;
        eightMonth = Math.ceil((eightMonthPricePercent * price) / 100) + price;
        tenMonth = Math.ceil((tenMonthPricePercent * price) / 100) + price;
        twelveMonth = Math.ceil((twelveMonthPricePercent * price) / 100) + price;
        eighteenMonth = Math.ceil((eighteenMonthPricePercent * price) / 100) + price;

        Stuff.create({
            expiration: new Date("2021-03-25T12:00:00Z"),
            inventoryNo: Math.floor(Math.random() * (100 - 10)) + 10,
            hasAbsolutePrice: true,
            price,
            wareId: wareList.id,
            wareTypeId: ware.wareTypeId,
            wareClassId: ware.wareClassId,
            wareGroupId: ware.wareGroupId,
            wareModelId: ware.wareModelId,
            storeId: store2.id,
            availableLongPayment: [
                LongPayment.twoMonth,
                LongPayment.fourMonth,
                LongPayment.sixMonth,
                LongPayment.eightMonth,
                LongPayment.tenMonth,
                LongPayment.twelveMonth,
                LongPayment.eighteenMonth,
                LongPayment.twentyFourMonth
            ],
            twoMonthPricePercent,
            twoMonth,
            fourMonthPricePercent,
            fourMonth,
            sixMonthPricePercent,
            sixMonth,
            eightMonthPricePercent,
            eightMonth,
            tenMonthPricePercent,
            tenMonth,
            twelveMonthPricePercent,
            twelveMonth,
            eighteenMonthPricePercent,
            eighteenMonth,
            twentyFourMonthPricePercent,
            twentyFourMonth,
            barcode: 62656799367 + Math.floor(Math.random() * (100 - 10)) + 10
        }).save();

        // orders
        // await Order.create({
        //     num: i,
        //     remaining: Math.floor(Math.random() * 10),
        //     wareId: wareList.id,
        //     requestorUserId: unitEmployee.id,
        //     organizationId: organization.id,
        //     unitId: unit.id,
        //     deliveryTime: new Date("2020-02-25T10:00:00Z"),
        //     chosenPayment: ChosenPayment.Incash
        // }).save();

        // await Order.create({
        //     num: i,
        //     remaining: Math.floor(Math.random() * 10),
        //     wareId: wareList.id,
        //     requestorUserId: unitHead.id,
        //     organizationId: organization.id,
        //     unitId: unit.id,
        //     stuffId: stuff.id,
        //     deliveryTime: new Date("2020-02-25T10:00:00Z"),
        //     chosenPayment: ChosenPayment.Incash,
        //     longPayment: LongPayment.eightMonth
        // }).save();

        // await Order.create({
        //     num: i,
        //     remaining: Math.floor(Math.random() * 10),
        //     wareId: wareList.id,
        //     requestorUserId: unitHead.id,
        //     organizationId: organization.id,
        //     unitId: unit.id,
        //     stuffId: stuff.id,
        //     deliveryTime: new Date("2020-02-25T10:00:00Z")
        // }).save();

        // await Order.create({
        //     num: i,
        //     remaining: Math.floor(Math.random() * 10),
        //     wareId: wareList.id,
        //     requestorUserId: unitHead.id,
        //     organizationId: organization.id,
        //     unitId: unit.id,
        //     stuffId: stuff2.id,
        //     deliveryTime: new Date("2020-02-25T10:00:00Z")
        // }).save();
    }
    for (let i = 0; i < 5; i++) {
        const myunitEmployee = await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: Number("9891250054" + (i + 10)),
            password: "123456" + (i + 10),
            ssn: "3864898" + (i + 10),
            devices: [],
            isActive: true
        }).save();

        await UserToSite.create({
            userId: myunitEmployee.id,
            role: UserRole.UnitEmployee,
            siteId: unit.id
        }).save();

        let userId = myunitEmployee.id;
        let UpdateAllowedWaresInput = allowedWare;
        await User.update(userId, {
            allowedWaresIds: UpdateAllowedWaresInput
        });
        const myunitHead = await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: Number("9891250053" + (i + 10)),
            password: "123457" + (i + 10),
            ssn: "3864899" + (i + 10),
            devices: [],
            isActive: true
        }).save();

        await UserToSite.create({
            userId: myunitHead.id,
            role: UserRole.UnitHead,
            siteId: unit.id
        }).save();

        UpdateAllowedWaresInput = allowedWare;
        await User.update(myunitHead.id, {
            allowedWaresIds: UpdateAllowedWaresInput
        });

        await User.update(unitHead.id, {
            allowedWaresIds: UpdateAllowedWaresInput
        });

        await User.update(unitEmployee.id, {
            allowedWaresIds: UpdateAllowedWaresInput
        });

        const myHospitalHead = await User.create({
            firstName: headHospitalList[i].split("@")[0],
            lastName: headHospitalList[i].split("@")[1],
            phone: Number("9891250052" + (i + 10)),
            password: "123458" + (i + 10),
            ssn: "38648131" + (i + 10),
            devices: [],
            isActive: true
        }).save();

        await UserToSite.create({
            userId: myHospitalHead.id,
            role: UserRole.OrganizationHead,
            siteId: organization.id
        }).save();
        await UserToSite.create({
            userId: myHospitalHead.id,
            role: UserRole.Admin,
            siteId: organization.id
        }).save();
        userId = myHospitalHead.id;
        UpdateAllowedWaresInput = allowedWare;
        await User.update(userId, {
            allowedWaresIds: UpdateAllowedWaresInput
        });
    }
    const myFinanceHead = await User.create({
        firstName: "علی",
        lastName: "کامیار",
        phone: 989125005110,
        password: "12345843",
        ssn: "386428131",
        devices: [],
        isActive: true
    }).save();

    await UserToSite.create({
        userId: myFinanceHead.id,
        role: UserRole.FinanceHead,
        siteId: organization.id
    }).save();

    const myExpert = await User.create({
        firstName: "مجتبی",
        lastName: "نبوی",
        phone: 989125005010,
        password: "12345843",
        ssn: "386429231",
        devices: [],
        isActive: true
    }).save();

    await UserToSite.create({
        userId: myExpert.id,
        role: UserRole.Expert,
        siteId: organization.id
    }).save();

    const myStockclerk = await User.create({
        firstName: "مجید",
        lastName: "مجیدی",
        phone: 989125005050,
        password: "12345843",
        ssn: "38642923431",
        devices: [],
        isActive: true
    }).save();

    await UserToSite.create({
        userId: myStockclerk.id,
        role: UserRole.Stockclerk,
        siteId: organization.id
    }).save();

    const mySupplier = await User.create({
        firstName: "مصطفی",
        lastName: "صمدی",
        phone: 989125005060,
        password: "12345843",
        ssn: "3864292331",
        devices: [],
        isActive: true
    }).save();

    await UserToSite.create({
        userId: mySupplier.id,
        role: UserRole.Supplier,
        siteId: organization.id
    }).save();
}

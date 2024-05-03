class Trip {
    constructor(id, name, driverFullName, driverDNI, driverLicense, driverContactNumber, vehicleModel, vehiclePlate, vehicleTractorPlate, vehicleMaxLoad, vehicleVolume, cargoType, cargoWeight, cargoLoadLocation, cargoLoadImage, cargoLoadDate, cargoUnloadLocation, cargoUnloadDate, companyName, companyRUC, companyLogoImage) {
        this.id = id;
        this.name = name;
        this.driver = {
            fullName: driverFullName,
            DNI: driverDNI,
            license: driverLicense,
            contactNumber: driverContactNumber
        };
        this.vehicle = {
            model: vehicleModel,
            plate: vehiclePlate,
            tractorPlate: vehicleTractorPlate,
            maxLoad: vehicleMaxLoad,
            volume: vehicleVolume
        };
        this.cargo = {
            type: cargoType,
            weight: cargoWeight,
            loadLocation: cargoLoadLocation,
            loadImage: cargoLoadImage,
            loadDate: cargoLoadDate,
            unloadLocation: cargoUnloadLocation,
            unloadDate: cargoUnloadDate
        };
        this.company = {
            name: companyName,
            ruc: companyRUC,
            logoImage: companyLogoImage
        };
    }
}

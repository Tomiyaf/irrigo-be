-- CreateTable
CREATE TABLE "devices" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soil_moisture_logs" (
    "id" SERIAL NOT NULL,
    "device_id" INTEGER NOT NULL,
    "moist_value" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "soil_moisture_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_capacity_config" (
    "id" SERIAL NOT NULL,
    "min_water_capacity_percent" DECIMAL(5,2) NOT NULL DEFAULT 10,

    CONSTRAINT "water_capacity_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_capacity_logs" (
    "id" SERIAL NOT NULL,
    "container_id" SERIAL NOT NULL,
    "current_height_cm" DECIMAL(5,2) NOT NULL,
    "current_litres" DECIMAL(6,2) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "water_capacity_logs_pkey" PRIMARY KEY ("id","container_id")
);

-- CreateTable
CREATE TABLE "water_containers" (
    "id" SERIAL NOT NULL,
    "device_id" INTEGER NOT NULL,
    "height_cm" DECIMAL(5,2) NOT NULL,
    "capacity_litres" DECIMAL(6,2) NOT NULL,

    CONSTRAINT "water_containers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watering_config" (
    "id" SERIAL NOT NULL,
    "min_soil_moisture_percent" DECIMAL(5,2) NOT NULL DEFAULT 80,
    "duration_ms" INTEGER NOT NULL DEFAULT 2000,
    "automated" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "watering_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watering_logs" (
    "id" SERIAL NOT NULL,
    "device_id" INTEGER NOT NULL,
    "duration_ms" INTEGER NOT NULL,
    "manual" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watering_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "light_intensity_logs" (
    "id" SERIAL NOT NULL,
    "device_id" INTEGER NOT NULL,
    "lux" DECIMAL(6,2) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "light_intensity_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "soil_moisture_logs" ADD CONSTRAINT "fk_soil_device_id" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "water_capacity_logs" ADD CONSTRAINT "fk_capacity_container_id" FOREIGN KEY ("container_id") REFERENCES "water_containers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "water_containers" ADD CONSTRAINT "fk_water_device_id" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "watering_logs" ADD CONSTRAINT "fk_watering_device_id" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "light_intensity_logs" ADD CONSTRAINT "fk_light_device_id" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

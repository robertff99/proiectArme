package projectArme.dtos.builders;

import projectArme.dtos.AdminDetailsDTO;
import projectArme.entities.Admin;
import projectArme.dtos.AdminDTO;

public class AdminBuilder {

    private AdminBuilder() {
    }

    public static AdminDTO toAdminDTO(Admin admin) {
        return new AdminDTO(admin.getId(), admin.getName(), admin.getAge(), admin.getAddress());
    }

    public static AdminDetailsDTO toAdminDetailsDTO(Admin admin) {
        return new AdminDetailsDTO(admin.getId(), admin.getName(), admin.getAddress(), admin.getAge());
    }

    public static Admin toEntity(AdminDetailsDTO adminDetailsDTO) {
        return new Admin(adminDetailsDTO.getName(),
                adminDetailsDTO.getAddress(),
                adminDetailsDTO.getAge())
                ;
    }
}

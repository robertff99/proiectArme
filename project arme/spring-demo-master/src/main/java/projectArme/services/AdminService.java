package projectArme.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectArme.controllers.handlers.exceptions.model.ResourceNotFoundException;
import projectArme.dtos.AdminDTO;
import projectArme.dtos.AdminDetailsDTO;
import projectArme.dtos.builders.AdminBuilder;
import projectArme.entities.Admin;
import projectArme.repositories.AdminRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AdminService {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdminService.class);
    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<AdminDTO> findAdmins() {
        List<Admin> adminList = adminRepository.findAll();
        return adminList.stream()
                .map(AdminBuilder::toAdminDTO)
                .collect(Collectors.toList());
    }

    public AdminDetailsDTO findAdminById(UUID id) {
        Optional<Admin> prosumerOptional = adminRepository.findById(id);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("Admin with id {} was not found in db", id);
            throw new ResourceNotFoundException(Admin.class.getSimpleName() + " with id: " + id);
        }
        return AdminBuilder.toAdminDetailsDTO(prosumerOptional.get());
    }

    public UUID insert(AdminDetailsDTO adminDTO) {
        Admin admin = AdminBuilder.toEntity(adminDTO);
        admin = adminRepository.save(admin);
        LOGGER.debug("Admin with id {} was inserted in db", admin.getId());
        return admin.getId();
    }

    public String delete(UUID id){
        adminRepository.deleteById(id);
        return "Completed";
    }
}

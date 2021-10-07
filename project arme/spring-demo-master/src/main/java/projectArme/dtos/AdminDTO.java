package projectArme.dtos;

import org.springframework.hateoas.RepresentationModel;

import java.util.Objects;
import java.util.UUID;

public class AdminDTO extends RepresentationModel<AdminDTO> {
    private UUID id;
    private String name;
    private int age;
    private String address;

    public AdminDTO() {
    }

    public AdminDTO(UUID id, String name, int age,String address) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.address=address;
    }

    public AdminDTO( String name, int age,String address) {
        this.name = name;
        this.age = age;
        this.address=address;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        AdminDTO adminDTO = (AdminDTO) o;
        return age == adminDTO.age &&
                Objects.equals(id, adminDTO.id) &&
                Objects.equals(name, adminDTO.name) &&
                Objects.equals(address, adminDTO.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, name, age, address);
    }
}

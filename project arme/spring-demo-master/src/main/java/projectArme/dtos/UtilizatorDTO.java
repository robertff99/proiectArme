package projectArme.dtos;

import org.springframework.hateoas.RepresentationModel;

import java.util.Objects;
import java.util.UUID;

public class UtilizatorDTO extends RepresentationModel<UtilizatorDTO> {
    private UUID id;
    private String username;
    private String password;
    private String role;

    public UtilizatorDTO() {
    }

    public UtilizatorDTO(UUID id, String username, String password,String role) {
        this.id = id;
        this.username = username;
        this.password=password;
        this.role=role;
    }

    public UtilizatorDTO(UUID id, String username, String role) {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        UtilizatorDTO that = (UtilizatorDTO) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(username, that.username) &&
                Objects.equals(password, that.password) &&
                Objects.equals(role, that.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, username, password, role);
    }
}

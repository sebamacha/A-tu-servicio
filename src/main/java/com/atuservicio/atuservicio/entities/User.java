package com.atuservicio.atuservicio.entities;

import com.atuservicio.atuservicio.enums.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)    //la clase hija 'Supplier' debe tener su propia tabla en la BBDD
public class User extends Base implements UserDetails {
    
    private String name;
    
    @Column(unique = true)       //los valores del campo 'email' en la tabla 'users' deben ser únicos
    private String email;
    
    private String password;
    
    private Boolean active;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne
    @JoinColumn(name="image_id", referencedColumnName = "id")
    private Image image;
    
    private String address;
    
    private Long address_number;
    
    private String city;
    
    private String province;
    
    private String country;
    
    private String postal_code;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Contract> contracts;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)   //Relación 'uno a muchos' --> un usuario puede escribi muchos comentarios
    private List<Comment> comments;

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)  //Relación 'uno a muchos' --> un usuario puede recibir muchos comentarios
    private List<Comment> comments_received;

    @PrePersist
    private void prePersistActive(){
        this.active = true;
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();

        GrantedAuthority p = new SimpleGrantedAuthority("ROLE_" + this.role.toString());

        authorities.add(p);

        return authorities;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.active;
    }


    /*
    cascade = CascadeType.ALL --> al eliminar un 'User', automáticamente se 
    eliminan todos los 'Comments' asociados.
    */
}